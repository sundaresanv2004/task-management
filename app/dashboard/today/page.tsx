'use client'

import React from 'react'
import useSWR from "swr"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ViewTasks from "@/components/shared/Tasks/ViewTasks"
import { LayoutGrid, List, Columns } from 'lucide-react'
import TaskGrid from "@/components/shared/Tasks/TaskGrid"
import { Task } from "@prisma/client"
import Loading from "@/app/dashboard/loading"
import { useRouter } from 'next/navigation'
import Error from "@/app/dashboard/error"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function TodayTasks() {
    const router = useRouter()
    const {
        data: tasks,
        error,
        isLoading,
    } = useSWR<Task[]>("/api/tasks", fetcher)

    if (isLoading) return <Loading />
    if (error) return <Error error={error} reset={() => router.refresh()} />

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayTasks = (tasks || []).filter(task => {
        if (!task.dueDate) {
            return false; // Exclude tasks with no due date
        }
        const taskDate = new Date(task.dueDate)
        taskDate.setHours(0, 0, 0, 0)
        return taskDate.getTime() === today.getTime()
    })

    return (
        <div className="h-auto">
            <div className="flex flex-1 flex-col gap-4 p-4 max-w-7xl mx-auto">
                <Tabs defaultValue="grid">
                    <TabsList>
                        <TabsTrigger value="grid">
                            <LayoutGrid className="w-4 h-4 mr-2" />
                            Grid View
                        </TabsTrigger>
                        <TabsTrigger value="table">
                            <List className="w-4 h-4 mr-2" />
                            Table View
                        </TabsTrigger>
                        <TabsTrigger value="kanban">
                            <Columns className="w-4 h-4 mr-2" />
                            Kanban View
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="grid" className="mt-6">
                        {todayTasks.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-400">No tasks due today!</div>
                        ) : (
                            <TaskGrid tasks={todayTasks} />
                        )}
                    </TabsContent>
                    <TabsContent value="table" className="mt-6">
                        {todayTasks.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-400">No tasks due today!</div>
                        ) : (
                            <ViewTasks tasks={todayTasks} />
                        )}
                    </TabsContent>
                    <TabsContent value="kanban" className="mt-6">
                        <div className="text-center text-gray-500 dark:text-gray-400">Kanban View Coming Soon</div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

