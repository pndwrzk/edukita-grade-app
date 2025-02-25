import { LIST_SUBJECT } from "@/app/constanst/subject";

export default function AssignmentFilter({ filterSubject, setFilterSubject }: Readonly<{ filterSubject: string; setFilterSubject: (value: string) => void }>) {
    return (
      <div className="my-3 w-[200px]">
        <select
          id="subject"
          onChange={(e) => setFilterSubject(e.target.value)}
          value={filterSubject}
          className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-gray-500 text-black"
        >
          <option value="" className="text-black">
           All Subject
          </option>
          {LIST_SUBJECT.map((subject) => (
            <option key={subject.value} value={subject.value} className="text-black">
              {subject.label}
            </option>
          ))}
        </select>
      </div>
    )
}