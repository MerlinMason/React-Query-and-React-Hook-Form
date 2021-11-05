import { render } from "../../testUtils.jsx";
import Pagination from "../Pagination";

describe("<Pagination />", () => {
    it("Should correctly calculate total pages from props", () => {
        const example1 = render(<Pagination itemsPerPage={10} totalItems={45} />);
        const example2 = render(<Pagination itemsPerPage={10} totalItems={5} />);
        const example3 = render(<Pagination itemsPerPage={1} totalItems={3} />);

        expect(example1.getByLabelText("Total pages 5")).toBeInTheDocument();
        expect(example2.getByLabelText("Total pages 1")).toBeInTheDocument();
        expect(example3.getByLabelText("Total pages 3")).toBeInTheDocument();
    });

    it("Should conditionally display next and previous buttons", () => {
        const label = (p) => `Go to page ${p}`;

        const example1 = render(<Pagination currentPage={1} itemsPerPage={10} totalItems={50} />);
        const example2 = render(<Pagination currentPage={2} itemsPerPage={10} totalItems={50} />);
        const example3 = render(<Pagination currentPage={5} itemsPerPage={10} totalItems={50} />);

        expect(example1.queryByLabelText(label(0))).not.toBeInTheDocument();
        expect(example1.getByLabelText(label(2))).toBeInTheDocument();

        expect(example2.getByLabelText(label(1))).toBeInTheDocument();
        expect(example2.getByLabelText(label(3))).toBeInTheDocument();

        expect(example3.getByLabelText(label(4))).toBeInTheDocument();
        expect(example3.queryByLabelText(label(6))).not.toBeInTheDocument();
    });
});
