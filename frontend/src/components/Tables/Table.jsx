// Table.js
import React from "react";
import { useTable,useGlobalFilter,usePagination, useSortBy } from "react-table";
import SearchFilter from "./SearchFilter";
import {BsFillCaretDownSquareFill} from 'react-icons/bs'
import {BsFillCaretUpSquareFill} from 'react-icons/bs'
// Create a default prop getter
const defaultPropGetter = () => ({})

/*The table takes the column header names and the data for each column */
export default function Table({
   columns, 
   data, 
   getHeaderGroupProps = defaultPropGetter,
   getHeaderProps = defaultPropGetter,
   getRowProps = defaultPropGetter,
   getCellProps = defaultPropGetter,
  }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has grouping
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // Additional Pagination options
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    state: { pageIndex, pageSize },
  
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
    columns,
    data,
    initialState: {
      pageIndex: 0,
      pageSize:10,
      hiddenColumns: columns.map(column => {
        if (column.show === false) return column.accessor || column.id;
    }),
      
    },
  },
    useGlobalFilter,
    useSortBy,
    usePagination,
    )
 
/*
let color = "white";
if (data.grade == 1) {
    color = '#b3ff7a';
}
else if (data.grade == 2) {
    color = '#0391c4';      
}
else if (data.grade == 3) {
    color = '#f6c232';      
}
else if (data.grade == 4) {
    color = '#ff8315';      
}
*/


  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <>
    
    <SearchFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
    />
    <table {...getTableProps()} className="table-background">
    <thead>
      {// Loop over the header rows
      headerGroups.map(headerGroup => (
        // Apply the header row props
        <tr {...headerGroup.getHeaderGroupProps(
          getHeaderGroupProps(headerGroup)
          )}>
          {// Loop over the headers in each row
          headerGroup.headers.map(column => (
            // Apply the header cell props
            <th {...column.getHeaderProps(
              [
                column.getSortByToggleProps(),
                getHeaderProps(column),
              ],
             
              
              
            )}>
              {// Render the header
              column.render('Header')}
                <span style={{paddingLeft:"5px"}}> 
                  {column.isSorted
                    ? column.isSortedDesc
                      ?<BsFillCaretDownSquareFill/>
                      :<BsFillCaretUpSquareFill/>
                    : ''}
                </span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
    {/* Apply the table body props */}
    <tbody {...getTableBodyProps()}>
      {// Loop over the table rows
      page.map(row => {
        // Prepare the row for display
        prepareRow(row)
        return (
          // Apply the row props
          <tr {...row.getRowProps(
            getRowProps(row)
          )}
          
          >
            {// Loop over the rows cells
            row.cells.map((cell,index) => {
              // Apply the cell props
              return (
                <td {...cell.getCellProps(
                  getCellProps(cell)
                )}
                
                >
                  
                  {// Render the cell contents
                  cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
  
  <div className="pagination">
  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
    {'<<'}
  </button>{' '}
  <button onClick={() => previousPage()} disabled={!canPreviousPage}>
    {'<'}
  </button>{' '}
  <button onClick={() => nextPage()} disabled={!canNextPage}>
    {'>'}
  </button>{' '}
  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
    {'>>'}
  </button>{' '}
  <span>
    Page{' '}
    <strong>
      {pageIndex + 1} of {pageOptions.length}
    </strong>{' '}
  </span>
  <span>
    | Go to page:{' '}
    <input
      type="number"
      defaultValue={pageIndex + 1}
      onChange={e => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0
        gotoPage(page)
      }}
      style={{ width: '100px' }}
    />
  </span>{' '}
  <select
    value={pageSize}
    onChange={e => {
      setPageSize(Number(e.target.value))
    }}
  >
    {[10, 20, 30, 40, 50].map(pageSize => (
      <option key={pageSize} value={pageSize}>
        Show {pageSize}
      </option>
    ))}
  </select>
</div>
  </>
  );
}