import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TABLE_HEAD = ["Site Name", "Action"];

const TABLE_ROWS = [
  {
    name: "Cal Commit Dashboard",
    url:
      process.env.NODE_ENV === "production"
        ? "https://dashboard-psi-sable.vercel.app/sso-success"
        : "http://localhost:3001/sso-success",
  },
];

export function Redirects() {
  const [durl, setDurl] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [repPts, setRepPts] = useState(null);
  const [since, setSince] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const durl = location?.state?.durl;
    const token = location?.state?.token;
    const role = location?.state?.role;
    const fullName = location?.state?.fullName;
    const repPts = location?.state?.repPts;
    const since = location?.state?.since;

    durl && setDurl(durl);
    token && setToken(token);
    role && setRole(role);
    fullName && setFullName(fullName);
    repPts >= 0 && setRepPts(repPts);
    since && setSince(since);
  }, [location]);

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#a8dadc]">
      <Typography className="text-3xl font-dela-gothic mt-5 text-[#e63946]">
        Where do you want to go?
      </Typography>
      <Card className="mt-5 h-fit w-1/2 overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-b-2 border-blue-400 bg-blue-gray-800 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-dm-sans font-bold text-lg leading-none opacity-70 text-white"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, url }, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-dm-sans text-lg font-semibold"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Link
                    to={`${url}?durl=${durl}&token=${token}&role=${role}&fullName=${fullName}&repPts=${repPts}&since=${since}`}
                    className="transition-all duration-300 ease-in-out font-dm-sans font-semibold text-light-blue-700 underline hover:text-light-blue-900 hover:decoration-double"
                  >
                    Go
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
