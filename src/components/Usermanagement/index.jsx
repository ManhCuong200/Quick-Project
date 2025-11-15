import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, KeyRound } from "lucide-react";

const users = [
  { id: 1, username: "cuongdavis", email: "manhcuong@gmail.com", role: "User" },
  { id: 2, username: "cuonghehe", email: "cuongsama@gmail.com", role: "User" },
];

export default function Usermanagement() {
  return (
    <div className="px-4 mx-auto max-w-7xl pt-4 pb-20">
      <h2 className="text-4xl md:text-5xl font-semibold text-[#5044E5] text-center mt-10 mb-12 flex items-center justify-center gap-3">
        🧩 User Management
      </h2>

      <Table className="shadow-sm border rounded-xl">
        <TableHeader>
          <TableRow className="bg-gray-50 text-gray-700">
            <TableHead className="font-semibold">USERNAME</TableHead>
            <TableHead className="font-semibold">EMAIL</TableHead>
            <TableHead className="font-semibold text-center">ROLE</TableHead>
            <TableHead className="font-semibold text-center w-[150px]">
              ACTION
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-center">{user.role}</TableCell>

              <TableCell className="flex items-center justify-center gap-3 py-3">
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-md"
                >
                  <Trash2 size={16} />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-md border-[#5044E5] text-[#5044E5]"
                >
                  <KeyRound size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
