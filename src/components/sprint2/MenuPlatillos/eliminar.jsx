const [plat, setPlat] = useState([]);


useEffect(() => {
  async function fetchPlatillos() {
    try { 
      const response = await fetch(`http://18.116.106.247:3000/all`);
      if (response.ok) {
       
        const data = await response.json();
        setPlat(data.result);
      } else {
        console.error('Error al obtener platillos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }
  fetchPlatillos();
}, []);

let size=plat.length; 