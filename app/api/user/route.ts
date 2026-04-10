import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { checkUser } from '@/lib/clerk';

export async function GET() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await checkUser(clerkUser);

    return NextResponse.json({
      clerkUserId: user.clerkUserId,
      imageUrl: user.imageUrl,
      email: user.email,
      emailVerified: user.emailVerified,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      onboardingStatus: user.onboardingStatus,
      preferences: user.preferences,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to load user profile' }, { status: 500 });
  }
}
