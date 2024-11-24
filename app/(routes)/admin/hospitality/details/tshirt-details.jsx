import { columns } from "./_components/_tshirtDetails/columns";
import { DataTable } from "./_components/_tshirtDetails/data-table";

export const TshirtRelatedDetails = ({
  allParticipantsData,
  allStatsData,
  setAllParticipantsData,
}) => {
  return (
    <div className="flex flex-col mt-2">
      <p className="text-xl font-semibold mb-2">Total Participants :</p>
      <p>Opted For Sweat Shirt: {allStatsData?.totalTshirtDetails?.total}</p>
      <p>Alloted Sweat Shirt: {allStatsData?.totalTshirtDetails?.alloted}</p>
      <p>Pending Allocation: {allStatsData?.totalTshirtDetails?.pending}</p>
      <div className="w-full text-center">
        <DataTable
          columns={columns(setAllParticipantsData)}
          data={allParticipantsData}
        />
      </div>
    </div>
  );
};
