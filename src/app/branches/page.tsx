export default function Branches() {
  return (
    <div id="branch-gallery" className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 mb-4">
          <div className="w-full px-4">
            <h2
              className="text-2xl font-bold text-center text-primary uppercase mb-8 font-roboto"
              data-i18n="branch-gallery"
            >
              Branch Gallery
            </h2>
          </div>
        </div>

        <div className="w-full mb-4">
          <div className="overflow-x-auto">
            <table
              id="table-branch"
              className="w-full text-left border-collapse"
              data-show-header="false"
            >
              <thead>
                <tr>
                  <th
                    className="w-full sm:w-1/3 px-4 py-2"
                    data-field="branch-name"
                    data-formatter="branchImageFormatter"
                  ></th>
                  <th
                    className="w-full sm:w-2/3 px-4 py-2"
                    data-field="branch-address"
                    data-formatter="branchDetailsFormatter"
                  ></th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
