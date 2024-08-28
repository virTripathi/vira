import { Card, Typography } from "@material-tailwind/react";
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/solid'
import { EyeIcon } from '@heroicons/react/24/solid'

const componentsMap = {
    "View": EyeIcon,
    "Edit": PencilSquareIcon,
    "Delete": TrashIcon,
};

export default function Table({ headers, rows, actionLabels, onActionClick }) {
  return (
    <Card className="h-full w-full overflow-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {header}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const isLast = rowIndex === rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={row.id || rowIndex}>
                {Object.keys(row).map((key, colIndex) => (
                  <td key={colIndex} className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row[key]}
                    </Typography>
                  </td>
                ))}
                <td className={classes}>
                    <div className="flex gap-4">
                                {actionLabels.map((labelObj, actionIndex) => {
                                    const label = Object.keys(labelObj)[0];
                                    const Component = componentsMap[label];
                                    const styles = labelObj[label];
                                
                                    if (!Component) {
                                        return null;
                                    }
                                
                                    return (
                                        <Component
                                            key={actionIndex}
                                            style={styles}
                                            className="w-4 h-4"
                                            onClick={() => onActionClick[actionIndex](row)}
                                        />
                                    );
                                })}
                                </div>
                            </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
