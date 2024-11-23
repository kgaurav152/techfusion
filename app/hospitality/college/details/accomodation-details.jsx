import { columns } from "@/app/admin/hospitality/details/_components/_accomodationDetails/columns";
import { DataTable } from "@/app/admin/hospitality/details/_components/_accomodationDetails/data-table";

export const AccomodationRelatedDetails = ({
  allParticipantsData,
  allStatsData,
  fetchData,
  setAllParticipantsData,
}) => {
  return (
    <div className="flex flex-col mt-2">
      <p className="text-xl font-semibold mb-2">Total Participants :</p>
      <p>Opted For Accomodation: {allStatsData?.totalAccomodation?.total}</p>
      <p>Alloted Accomodation: {allStatsData?.totalAccomodation?.alloted}</p>
      <p>Pending Allocation: {allStatsData?.totalAccomodation?.pending}</p>
      <div className="w-full text-center">
        <DataTable
          columns={columns(setAllParticipantsData)}
          data={allParticipantsData}
        />
      </div>
    </div>
  );
};
