
import pink from "../../assets/pink.svg";
import green from "../../assets/green.svg";
import yellow from "../../assets/yellow.svg";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <>
      <div className="position-fixed label-class">
        <div className="row">

          <div className="col-2">
            <img
              src={green}
              alt="marker"
            />
          </div>
          <div className="col-10">
            CO2 Level &lt;&#61; 1000
          </div>
          <div className="col-2">
            <img
              src={yellow}
              alt="marker"
            />
          </div>
          <div className="col-10">
            CO2 Level &gt; 1000 and Level &lt;&#61; 2000
          </div>
          <div className="col-2">
            <img
              src={pink}
              alt="marker"
            />
          </div>
          <div className="col-10">
            CO2 Level &gt; 2000
          </div>
        </div>

      </div>
    </>
  )


}