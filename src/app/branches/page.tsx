import { DataTable } from "@/components/shared/DataTable";
import { BranchSchema } from "@/lib/schemas";
import { useModel } from "@/hooks/useModel";
import { z } from "zod";
import Image from "next/image";
export default function Branches() {
  const { data } = useModel("branch");
  const title = "Branch Gallery";
  const columns = [
    {
      accessorKey: "name",
      cell: ({ row }: { row: { original: z.infer<typeof BranchSchema> } }) => {
        const record = row.original;
        return (
          <Image className="mini-img" src={record.path} alt={record.name} />
        );
      },
    },
    {
      accessorKey: "address",
      cell: ({ row }: { row: { original: z.infer<typeof BranchSchema> } }) => {
        const record = row.original;
        return (
          <article>
            <b>{record.name}</b>
            <p>{record.address}</p>
          </article>
        );
      },
    },
  ];

  return (
    <div id="branch-gallery" className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 mb-4">
          <div className="w-full px-4">
            <h2
              className="text-2xl font-bold text-center text-primary uppercase mb-8"
              data-i18n="branch-gallery"
            >
              Branch Gallery
            </h2>
          </div>
        </div>

        <div className="w-full mb-4">
          <div className="overflow-x-auto">
            <DataTable title={title} columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
