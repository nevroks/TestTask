import axios from "axios";
import CryptoJS from"crypto-js"
import md5 from "md5"
function App() {
    function getData() {
        const password="Valantis"
        const today = new Date();
        const year = today.getUTCFullYear().toString();
        const month = (today.getUTCMonth() + 1).toString(); // Месяцы в JavaScript начинаются с 0
        const day = today.getUTCDate().toString();
        let stamp=md5(`${password}_${year+month+day}`)
        axios({
          url: "https://api.valantis.store:41000",
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              "X-Auth": `${stamp}`,
          },
        body:JSON.stringify({
            "action": "filter",
            "params": {"price": 17500.0}
        })
      }).then(response => console.log(response))
  }
  return (
    <>
      <button onClick={getData}>Отправить запрос</button>
    </>
  )
}

export default App
