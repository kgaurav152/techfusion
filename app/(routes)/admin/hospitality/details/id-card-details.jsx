import { columns } from "./_components/_idDetails/columns";
import { DataTable } from "./_components/_idDetails/data-table";

export const IdCardRelatedDetails = ({
  allParticipantsData,
  allStatsData,
  setAllParticipantsData,
}) => {
  return (
    <div className="flex flex-col mt-2">
      <p className="text-xl font-semibold mb-2">Total Participants :</p>
      <p>Id: {allStatsData?.idCardAllocation?.total}</p>
      <p>Alloted Id Card: {allStatsData?.idCardAllocation?.yes}</p>
      <p>Pending Allocation: {allStatsData?.idCardAllocation?.no}</p>
      <div className="w-full text-center">
        <DataTable
          columns={columns(setAllParticipantsData)}
          data={allParticipantsData}
        />
      </div>
    </div>
  );
};
