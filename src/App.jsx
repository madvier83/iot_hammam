import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [daya, setDaya] = useState([]);
  const [slider, setSlider] = useState(0);
  const [mode, setMode] = useState(false);

  async function getDaya() {
    try {
      var url = "http://localhost/monitoring_daya/get_daya.php";
      var response = await axios.get(url);
      setDaya(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getSlider() {
    try {
      var url = "http://localhost/monitoring_daya/get_slider.php";
      var response = await axios.get(url);
      setSlider(response.data?.value);
    } catch (error) {
      console.error(error);
    }
  }
  async function updateSlider(value) {
    console.log(value);
    try {
      var url = `http://localhost/monitoring_daya/update_slider.php?value=${value}`;
      var response = await axios.get(url);
      getSlider();
    } catch (error) {
      console.error(error);
    }
  }

  async function getMode() {
    try {
      var url = "http://localhost/monitoring_daya/get_mode.php";
      var response = await axios.get(url);
      setMode(response.data?.value == 1 ? true : false);
    } catch (error) {
      console.error(error);
    }
  }
  async function updateMode(value) {
    try {
      var url = `http://localhost/monitoring_daya/update_mode.php?value=${
        value ? 1 : 0
      }`;
      var response = await axios.get(url);
      getMode();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDaya();
    getMode();
    getSlider();
  }, []);

  return (
    <div className="p-32">
      <h1 className="text-4xl mb-8">Dashboard IOT</h1>
      <div className="form-control w-min">
        <label className="label cursor-pointer">
          <span className="label-text w-52">Toggle Mode</span>
          <input
            type="checkbox"
            className="toggle"
            checked={mode}
            onChange={async (e) => {
              console.log(e.target.checked); // Use e.target.checked to get the checked state
              setMode(e.target.checked);
              await updateMode(e.target.checked);
            }}
          />
        </label>
      </div>

      <div className="form-control w-96">
        <label className="label cursor-pointer">
          <span className="label-text w-52">Slider Dimmer ({slider})</span>
          <input
            type="range"
            min={0}
            max={255}
            value={slider}
            onChange={async (e) => {
              setSlider(e.target.value);
              await updateSlider(e.target.value);
            }}
            className="range"
            step="1"
          />
        </label>
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Tegangan</th>
              <th>Arus</th>
              <th>Daya</th>
              <th>Pemakaian Daya</th>
            </tr>
          </thead>
          <tbody>
            {daya?.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{item.tegangan} V</td>
                  <td>{item.arus} A</td>
                  <td>{item.daya} W</td>
                  <td>{item.pemakaian} KwH</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
