import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";

export default function PersonalInformation() {
  return (
    <div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <InputText placeholder="First name" />
        <InputText placeholder="Last name" />
      </div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-calendar"></i>
        </span>
        <Calendar
          //   value={date}
          placeholder="Date of birth"
          //   onChange={(e) => setDate(e.value)}
          //   inline
          showWeek
        />
      </div>

      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-home"></i>
        </span>
        <InputText placeholder="Address line 1" />
        <InputText placeholder="Address line 2" />
        <InputText placeholder="City" />
        <InputText placeholder="State" />
        <InputText placeholder="Zip code" />
      </div>
      <div className="p-inputgroup mb-2">
        <span className="p-inputgroup-addon">@</span>
        <InputText placeholder="Emaild Id" />
      </div>
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-phone"></i>
        </span>
        <InputMask
          //   value={value}
          //   onChange={(e) => setValue(e.target.value)}
          mask="(999)-999-999"
          placeholder="(###)-###-###"
        />
      </div>
    </div>
  );
}
