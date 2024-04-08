import Header from "../organisms/Header";

const DefaultTemplate = ({ children }) => {
  return (
    <div>
      <Header title="Atomic Design Example" />
      {children}
    </div>
  );
};
export default DefaultTemplate;
