import { connectDB } from './mongo';
import { User } from './models/models';

const normalizeClerkUserData = (clerkUser: any) => {
  const primaryEmail = clerkUser.emailAddresses?.[0]?.emailAddress || clerkUser.primaryEmailAddress || clerkUser.email;

  return {
    clerkUserId: clerkUser.id,
    email: primaryEmail,
    emailVerified: clerkUser.emailAddresses?.some((address: any) => address.verified) ?? clerkUser.emailVerified ?? false,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    fullName: clerkUser.fullName || [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ').trim(),
    imageUrl: clerkUser.imageUrl || clerkUser.imageUrl,
    phoneNumber: clerkUser.phoneNumber || clerkUser.primaryPhoneNumber?.phoneNumber,
    metadata: clerkUser.publicMetadata || clerkUser.privateMetadata || {},
  };
};

export async function upsertUserFromClerk(clerkUser: any) {
  await connectDB();
  const normalized = normalizeClerkUserData(clerkUser);

  return await User.findOneAndUpdate(
    { clerkUserId: clerkUser.id },
    normalized,
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );
}

export async function checkUser(clerkUser: any) {
  await connectDB();
  const normalized = normalizeClerkUserData(clerkUser);

  let user = await User.findOne({ clerkUserId: clerkUser.id });
  if (!user && normalized.email) {
    user = await User.findOne({ email: normalized.email });
  }

  if (!user) {
    return await User.create(normalized);
  }
//     await User.create(normalized);
//    const user = await User.findOne({ clerkUserId: clerkUser.id });
  if (!user.clerkUserId) {
    user.clerkUserId = normalized.clerkUserId;
    user.emailVerified = normalized.emailVerified;
    user.fullName = normalized.fullName || user.fullName;
    user.imageUrl = normalized.imageUrl || user.imageUrl;
    user.phoneNumber = normalized.phoneNumber || user.phoneNumber;
    user.metadata = { ...user.metadata, ...normalized.metadata };
    return await user.save();
  }

  return user;
}
