import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { UseQueryParam } from "../../hooks/UseQueryParam";
import WithErrorApi from '../../hockHelper/WithErrorApi';

import VehiclesList from '../../components/vehiclesPage/vehiclesList';
import VehiclesNavigation from "../../components/vehiclesPage/vehiclesNavigation";

import { getSwApiUrlData } from "../../utils/network";
import { getVehiclesId, getVehiclesImg, getPageId } from "../../services/getContainerData";
import { SWAPI_URL_VEHICLES, SWAPI_URL_PATH_PAGE } from "../../constants/constants";


const VehiclesPage = ({ setErrorApi }) => {
    const [vehiclesState, setVehiclesState] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [nowPage, setNowPage] = useState(null);

    const queryPage = UseQueryParam();
    const query = queryPage.get("page");    

    const getDataVehicles = async(url) => {
        const dataVehicles = await getSwApiUrlData(url);      
      
        if(dataVehicles) {
            const  vehiclesList = dataVehicles.results.map(({ 
                name,
                url
            }) => {                         
                const id = getVehiclesId(url);             
                const img = getVehiclesImg(id)

                return {
                name,
                id,
                img
             }           
            })       
            setVehiclesState(vehiclesList);  
            setNextPage(dataVehicles.next);
            setPreviousPage(dataVehicles.previous);
            setNowPage(getPageId(url));
            setErrorApi(false); 
        } else {
            setErrorApi(true);
        }
        }

    useEffect(() => {
        getDataVehicles(SWAPI_URL_VEHICLES+SWAPI_URL_PATH_PAGE+query);
    }, [])
    return (
        <>
            { vehiclesState && <VehiclesNavigation nextPage={ nextPage }  previousPage={ previousPage } nowPage={ nowPage } getDataVehicles={ getDataVehicles } /> }  
            { vehiclesState && <VehiclesList vehiclesState={ vehiclesState } /> }
        </>        
    )
}

VehiclesPage.propTypes = {
    setErrorApi: PropTypes.func
}


export default WithErrorApi(VehiclesPage);
