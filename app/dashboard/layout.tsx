import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardLayoutClient } from '@/components/DashboardLayoutClient';
import type { UserRole } from '@/types';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let user;
    try {
        user = await currentUser();
    } catch {
        redirect('/sign-in');
    }

    if (!user) {
        redirect('/sign-in');
    }

    const role = user.publicMetadata?.role as UserRole | undefined;
    const firstName = user.firstName || undefined;

    return (
        <DashboardLayoutClient role={role} firstName={firstName}>
            {children}
        </DashboardLayoutClient>
    );
}
