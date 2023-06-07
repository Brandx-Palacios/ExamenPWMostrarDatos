import { Card, Typography, CardBody, CardFooter, IconButton, Button, Chip, Progress } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const TABLE_HEAD = [ "#código", "Identificación", "Nombre y Apellido", "Fecha Nacimiento", "Tiempo Contrato", "Valor Contrato", "Estado" ];

function Datos() {
  const [employees, setEmployees] = useState([]);   
  const [currentPage, setcurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = employees.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(employees.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  function prevPage() {
    if (currentPage !== firstIndex) {
      setcurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setcurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== lastIndex) {
      setcurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://89.116.25.43:3500/api/empleados/listar"
        );
        const data = await response.json();
        setEmployees(data.result);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Card className="h-full w-full bg-black border rounded-xl pt-20">
      <CardBody className="px-15 ">
        <table className="w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-s border-pink-100 50/50 p-4"
                >
                  <Typography
                    variant="big"
                    color="white"
                    className="leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            
{records.map(
    ({ id, identificacion, nombres, fecha_nacimiento, tiempo_contrato, valor_contrato, estado }, index) => 
            {
                const isLast = index === employees.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-green-50";
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="big"
                        color="red"
                      >
                        {id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="big"
                        color="blue"
                      >
                        {identificacion}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="big"
                        color="orange"
                      >
                        {nombres}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="big"
                        color="brown"
                      >
                        {fecha_nacimiento}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="big"
                        color="orange"
                      >
                        <div className="flex w-full flex-col gap-4">
                          <Progress value={tiempo_contrato} color="indigo" />
                        </div>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="big"
                        color="violet"
                      >
                        {valor_contrato}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="w-max"
                          size="big"
                          value={estado ? "Activo" : "Inactivo"}
                          color={estado ? "green" : "red"}
                        />
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>

      </CardBody><CardFooter>
        
        <nav>
          <ul className="flex items-center justify-between border-t border-pink-50 p-4">
            <li>
              <Button
                variant="large"
                color="blue"
                size="big"
                disabled={currentPage <= 1 ? true : false}
                onClick={prevPage}
              >
                <a href="#">Atrás</a>
              </Button>
            </li>
            <div className="flex gap-20">
              {numbers.map((n, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                >
                  <IconButton
                    variant="large"
                    color="yellow"
                    size="big"
                    onClick={() => changeCPage(n)}
                  >
                    <a href="#">{n}</a>
                  </IconButton>
                </li>
              ))}
            </div>
            <li>
              <Button
                variant="large"
                color="blue"
                size="big"
                onClick={nextPage}
              >
                <a href="#">Adelante</a>
              </Button>
            </li>
          </ul>
        </nav>  
      </CardFooter>
    </Card>
  );
}

export default Datos;