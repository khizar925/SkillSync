'use client';

import * as React from 'react';
import {
    LayoutDashboard,
    User,
    Sparkles,
    ClipboardList,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';

interface NavLink {
    label: string;
    icon: React.ElementType;
    href?: string;
    onClick?: () => void;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    role: 'candidate' | 'recruiter';
    onOpenScore: () => void;
}

export function AppSidebar({ role, onOpenScore, ...props }: AppSidebarProps) {
    const pathname = usePathname();
    const { setOpenMobile } = useSidebar();

    const links: NavLink[] = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        ...(role === 'candidate' ? [
            { label: 'My Applications', icon: ClipboardList, href: '/dashboard/applications' } as NavLink,
        ] : []),
        {
            label: 'Score Resume',
            icon: Sparkles,
            onClick: () => {
                setOpenMobile(false);
                onOpenScore();
            }
        },
        { label: 'My Profile', icon: User, href: '/dashboard/profile' },
    ];

    return (
        <Sidebar collapsible="icon" {...props} className="border-r border-gray-100 shadow-sm">
            {/* Header / Logo */}
            <SidebarHeader className="h-20 flex flex-row items-center px-6 border-b border-gray-100 transition-all duration-300 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center overflow-hidden">
                <Link href="/dashboard" className="flex items-center gap-3 group shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/25 group-hover:shadow-emerald-600/40 group-hover:bg-emerald-700 transition-all duration-300 shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M8 2L5 6H2L4.5 8.5L3.5 12L8 9.5L12.5 12L11.5 8.5L14 6H11L8 2Z"
                                fill="white" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-gray-900 truncate group-data-[collapsible=icon]:hidden">
                        Smart<span className="text-emerald-600">Hire</span>
                    </span>
                </Link>
            </SidebarHeader>

            {/* Nav */}
            <SidebarContent className="px-3 pt-4 group-data-[collapsible=icon]:px-0">
                <SidebarGroup className="group-data-[collapsible=icon]:px-1">
                    <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-2 transition-opacity duration-300 group-data-[collapsible=icon]:opacity-0">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1 group-data-[collapsible=icon]:gap-2">
                            {links.map((link) => {
                                const isActive = link.href ? pathname === link.href : false;

                                return (
                                    <SidebarMenuItem key={link.label} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                                        <SidebarMenuButton
                                            asChild={!!link.href}
                                            isActive={isActive}
                                            tooltip={link.label}
                                            onClick={link.onClick}
                                            className={`
                                                h-10 rounded-xl transition-all duration-200
                                                ${isActive
                                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700'
                                                    : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-700'
                                                }
                                                group-data-[collapsible=icon]:h-11 group-data-[collapsible=icon]:w-11 group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl
                                            `}
                                        >
                                            {link.href ? (
                                                <Link href={link.href} onClick={() => setOpenMobile(false)} className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                                                    <link.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? '' : ''}`} />
                                                    <span className="font-medium text-sm group-data-[collapsible=icon]:hidden">{link.label}</span>
                                                </Link>
                                            ) : (
                                                <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                                                    <link.icon className="h-4 w-4 flex-shrink-0" />
                                                    <span className="font-medium text-sm group-data-[collapsible=icon]:hidden">{link.label}</span>
                                                </div>
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t border-gray-100 p-4 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                <div className="group-data-[collapsible=icon]:hidden">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                        <p className="text-[11px] text-emerald-700 font-medium">
                            AI-powered recruiting
                        </p>
                    </div>
                </div>
                <div className="hidden group-data-[collapsible=icon]:block">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
            </SidebarFooter>

            <SidebarRail className="hover:after:bg-emerald-600/10" />
        </Sidebar>
    );
}
