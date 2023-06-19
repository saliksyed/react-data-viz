import {
    CategoricalAxis,
    AxisPosition,
} from "../../lib/types";

import { NestedAxis } from "../axes/CategoricalAxis";



export function Table({
    xAxis,
    yAxis,
    xPosition,
    yPosition
  }: {
    xAxis: CategoricalAxis;
    yAxis: CategoricalAxis;
    xPosition: AxisPosition;
    yPosition: AxisPosition;
  }) {
    if (xPosition === "before" && yPosition=="before") {
      return (
        <table style={{
          width: "100%",
          height: "100%",
          borderSpacing: 0,
          borderCollapse: "collapse",
        }}>
          <tr>
            <td style={{
              padding: 0
            }}>
  
            </td>
            <td style={{
              padding: 0
            }}>
              <NestedAxis orientation="horizontal" position="before" axis={xAxis}/>
            </td>
          </tr>
          <tr>
            <td style={{
              padding: 0
            }}>
              <NestedAxis orientation="vertical" position="before" axis={yAxis}/>
            </td>
            <td style={{
              width: "100%",
              height: "100%",
              padding: 0
            }}>
              
            </td>
          </tr>
        </table>
      );
    } else if (xPosition === "after" && yPosition=="before"){
      return (
        <table style={{
          width: "100%",
          height: "100%",
          borderSpacing: 0,
          borderCollapse: "collapse",
        }}>
          <tr>
            <td style={{
              padding: 0,
            }}>
              <NestedAxis orientation="vertical" position="before" axis={yAxis}/>
            </td>
            <td style={{
              padding: 0,
              width: "100%",
              height: "100%",
            }}>
            </td>
          </tr>
          <tr>
            <td style={{
              padding: 0,
            }}>
            </td>
            <td style={{
              padding: 0
            }}>
              <NestedAxis orientation="horizontal" position="after" axis={xAxis}/>
            </td>
          </tr>
        </table>
      );
    } else if (xPosition === "after" && yPosition=="after"){
      return (
        <table style={{
          width: "100%",
          height: "100%",
          borderSpacing: 0,
          borderCollapse: "collapse",
        }}>
          <tr>
            <td style={{
              padding: 0,
              width: "100%",
              height: "100%",
            }}>
            </td>
            <td style={{
              padding: 0,
            }}>
              <NestedAxis orientation="vertical" position="after" axis={yAxis}/>
            </td>
          </tr>
          <tr>
            <td style={{
              padding: 0,
            }}>
              <NestedAxis orientation="horizontal" position="after" axis={xAxis}/>
            </td>
            <td style={{
              padding: 0
            }}>
              
            </td>
          </tr>
        </table>
      );
    } else if (xPosition === "before" && yPosition=="after"){
      return (
        <table style={{
          width: "100%",
          height: "100%",
          borderSpacing: 0,
          borderCollapse: "collapse",
        }}>
          <tr>
            <td style={{
              padding: 0,
            }}>
              <NestedAxis orientation="horizontal" position="before" axis={xAxis}/>
            </td>
            <td style={{
              padding: 0,
            }}>
            </td>
          </tr>
          <tr>
            <td style={{
              padding: 0,
              width: "100%",
              height: "100%",
            }}>
            </td>
            <td style={{
              padding: 0
            }}>
              <NestedAxis orientation="vertical" position="after" axis={yAxis}/>
            </td>
          </tr>
        </table>
      );
    }

    return null;

  }
  