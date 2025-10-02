import AddressForm from "./address/AddressForm.jsx";

function Addresspage() {
  return (
    <div
      style={{minHeight: "544px", display: "flex", flexDirection: "column", alignItems: "center" ,padding: "21px 125px",background: 'linear-gradient(to right bottom, #F06292, #EF9A9A)'}}
    >
      <h2>Delivery Address</h2>
      <AddressForm />
    </div>
  );
}

export default Addresspage;
