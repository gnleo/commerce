import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import '../styles/shops-map.scss'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlinePlus } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import happyMapIcon from '../utils/mapIcon'
import { IconButton } from "../components/IconButton";
import { Sidebar } from "../components/Sidebar";
import { api } from "../services/api";

interface Store {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function ShopsMap() {
    const [position, setPosition] = useState<[number, number]>([-2.2349536, -49.5032046])

    const [stores, setStores] = useState<Store[]>([])

    useEffect(() => {
        api.get('/store/storeList').then(response => {
            console.log("🚀 ~ api.get ~ response", response.data)
            setStores(response.data)
        })
    }, []) 

    return (
        <main>
            <div id="shops-map">
                <Sidebar
                    icon={<AiOutlineArrowLeft className='icon' />}
                />

                <MapContainer
                    center={position}
                    zoom={17}
                    scrollWheelZoom={false}
                    style={{ width: '100%', height: '100%' }}>

                    <TileLayer
                        // url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        stores.map(store => {
                            return (
                                <Marker key={store.id}
                                position={[store.latitude, store.longitude]}
                                icon={happyMapIcon}
                            >
                                <Popup
                                    closeButton={false}
                                    minWidth={345}
                                    maxWidth={345}
                                    className="map-popup"
                                >
                                    <span>
                                        {/* Mercadinho Fé em Deus */}
                                        {store.name}
                                    </span>
        
                                    <IconButton
                                        className='button-link'
                                        path={`/shop-details/${store.id}`}
                                        title="Detalhes"
                                        icon={<AiOutlineArrowRight className='icon' />}
                                    />
                                </Popup>
                            </Marker>                     
                            )
                        })
                    }

                    {/* <Marker
                        position={position}
                        icon={happyMapIcon}
                    >
                        <Popup
                            closeButton={false}
                            minWidth={345}
                            maxWidth={345}
                            className="map-popup"
                        >
                            <span>
                                Mercadinho Fé em Deus
                            </span>

                            <IconButton
                                className='button-link'
                                path="/shop-details"
                                title="Detalhes"
                                icon={<AiOutlineArrowRight className='icon' />}
                            />
                        </Popup>
                    </Marker> */}
                </MapContainer>

                <IconButton
                    className='button-create'
                    path="/new-shop"
                    title="Adicionar Loja"
                    icon={<AiOutlinePlus className='icon' />}
                />
            </div>
        </main>
    )
}

export { ShopsMap }