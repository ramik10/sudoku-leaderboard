"use client"

//icons
import { MdAlternateEmail, MdOutlineCalendarMonth } from "react-icons/md";

// Global imports
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";


// Local imports
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
//types
import { getFirstLettersOfWords } from "@/libs/getFirstLettersOfWords";
// Components
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";


type SafeUser = {
    id: string;
    name: string;
    image: string;
    gameMode: string;
    moves: number;
    timetaken: number;
}

// We need to specify Coloumns name and also specify how rows renders
export const columns: ColumnDef<SafeUser>[] = [
    // checkbox
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    // avatar images
    {
        accessorKey: "image",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Avatar" />
        ),
        cell: ({ row }) => <span className="max-w-12"><Avatar className="h-8 w-8">
            <AvatarImage src={row.getValue("image") || '/avatars/01.png'} alt="@shadcn" />
            <AvatarFallback>{getFirstLettersOfWords(row.getValue("name"))}</AvatarFallback>
        </Avatar></span>,
        enableSorting: false,
        enableHiding: false,
    },


    // names
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User" />
        ),
        cell: ({ row }) => {
            return (
                <span className="max-w-[80px] truncate font-medium text-white">
                    {row.getValue("name")}
                </span>
            )
        },
    },


   //Game Mode
    {
        accessorKey: "gameMode",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="GameMode" />
        ),
        cell: ({ row }) => {
            return (
                <span className="max-w-[80px] truncate font-medium text-white">
                    {row.getValue("gameMode")}
                </span>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },

    // Moves Taken
    {
        accessorKey: "moves",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Moves Taken" />
        ),
        cell: ({ row }) => {
            return (
                <span className="max-w-[80px] truncate font-medium text-white">
                {row.getValue("moves")}
            </span>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },

    // Time Taken
    {
        accessorKey: "timeTaken",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="TimeTaken(min:sec)" />
        ),
        cell: ({ row }) => {
            function padTo2Digits(num:number) {
                return num.toString().padStart(2, '0');
              }
              
              function convertMsToMinutesSeconds(milliseconds:number) {
                const minutes = Math.floor(milliseconds / 60000);
                const seconds = Math.round((milliseconds % 60000) / 1000);
              
                return seconds === 60
                  ? `${minutes + 1}:00`
                  : `${minutes}:${padTo2Digits(seconds)}`;
              }

              const time = convertMsToMinutesSeconds(row.getValue("timeTaken"))
            return (
                <span className="max-w-[80px] truncate font-medium text-white">
                {time}
            </span>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },

    // actions
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]