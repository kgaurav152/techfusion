"use client"

import { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useDownloadExcel } from 'react-export-table-to-excel';

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import {ArrowLeft, ArrowRight, Settings2} from "lucide-react";

export const DataTable = ({
  columns,
  data, 
}) => {

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    
    const printAreaRef = useRef(null);
    const handlePrint = useReactToPrint({
      content: () => printAreaRef.current,
    });

    const tableRef = useRef(null);
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'List of all events',
        sheet: 'Events'
    })

  const table = useReactTable({
  data,
  columns,
  state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
  },
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  getSortedRowModel: getSortedRowModel(),
  // getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
        <div className="flex items-center justify-between">
            <div className="flex items-center py-2 lg:py-4 mr-1 lg:mr-4">
            <Input
            placeholder="Filter TechFest Id..."
            value={(table.getColumn("festId")?.getFilterValue()) ?? ""}
            onChange={(event) =>
                table.getColumn("festId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
            </div>
            <div className="flex items-center py-2 lg:py-4 mr-1 lg:mr-4">
            <Input
            placeholder="Filter College..."
            value={(table.getColumn("college")?.getFilterValue()) ?? ""}
            onChange={(event) =>
                table.getColumn("college")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
            </div>
            <div className="flex items-center py-2 lg:py-4 mr-1 lg:mr-4">
            <Input
            placeholder="Filter Events..."
            value={(table.getColumn("events")?.getFilterValue()) ?? ""}
            onChange={(event) =>
                table.getColumn("events")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
            </div>
            <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Settings2 /> View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <div className="rounded-md border text-white print:m-10 print:text-black" ref={printAreaRef}>
          <Table ref={tableRef}>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id} className="text-center">
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
          </Table>
        </div>
        <div className="text-center text-white mt-20 mb-4">
          <Button onClick={handlePrint} className="text-white">
            Print
          </Button>
        </div>
        <Button onClick={onDownload}> Export excel </Button>
    </>
  )
}

export default DataTable;
