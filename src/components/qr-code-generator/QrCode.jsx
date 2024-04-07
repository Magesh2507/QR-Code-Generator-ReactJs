import React, { useState, useEffect } from 'react';
import './qrCode.css';

const QrCode = () => {
    const [data, setData] = useState("");
    const [size, setSize] = useState("");
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);

    const generateQrCode = () => {
        setLoading(true);       
        try {
            const url = `https://chart.googleapis.com/chart?chs=${size}&cht=qr&chl=${encodeURIComponent(data)}`;
            setImg(url);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const downloadQrCode = async () => {
        try {
            const response = await fetch(img);
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            link.click();
        } catch (err) {
            console.error(err);
        }
    };

    const setQrCodeSize = (e) => {
        const inputValue = e.target.value;
        if (/^\d+$/.test(inputValue)) {
            setSize(inputValue);
        } 
    };
    
    useEffect(() => {
        if (img) {
            setData("");
            setSize("");
            setLoading(false);
        }
    }, [img]);

    return (
        <div className='app-container'>
            <h1>QR CODE GENERATOR</h1>
            {loading && <p>loading...</p>}
            {img && <img src={img} className='image' style={{ width: `${size}px`, height: `${size}px` }} alt='QR Code' />}
            <label htmlFor='qr-data' >Data for QR Code:</label>
            <input id='qr-data' placeholder='' disabled={img} value={data} onChange={(e) => setData(e.target.value)} />
            <label htmlFor='image-size' >Image Size (e.g. 150):</label>
            <input id='image-size' placeholder='' disabled={img} value={size} onChange={(e) => setQrCodeSize(e)} />
            <button className='button generate-qrcode' onClick={generateQrCode} disabled={!(data && size)}>Generate QR Code</button>
            <button className='button download-qrcode' onClick={downloadQrCode} disabled={!img}>Download QR Code</button>
        </div>
    );
};

export default QrCode;
