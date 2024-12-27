"use client"

import * as React from "react"
import { LogOut, Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavFooter() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Moon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Sun className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="ml-1">
                        {mounted ? (theme === "light" ? "Dark Mode" : "Light Mode") : "Theme"}
                    </span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <LogOut className="text-base"/>
                    <span className="ml-1">Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
