import { Fragment } from "react";
import '../assets/styles/index.css'

function Table({data,config,keyFn}){
    const renderHeaders=config.map((column)=>{
        if (column.header){
            return <Fragment key={column.label} >{column.header()}</Fragment>
        }
        return <th key={column.label} className="p-2 text-center border pink text-white">{column.label}</th>


    })

    const renderRows=data.map((rowData)=>{
        const renderCells=config.map((column)=>{
            return <td className="p-2 text-center " key={column.label}>{column.render(rowData)}</td>
        })
return (
    <tr className="pointer" key={keyFn(rowData)}>
        {renderCells}
    </tr>
)
    })
    return <table id="Patients" className="table-auto border-spacing-2">
      <thead>
<tr className="pointer">
   {renderHeaders}
</tr>
      </thead>
      <tbody>
{renderRows}
      </tbody>
    </table>
}

export default Table