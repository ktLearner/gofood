import React, { useEffect, useRef, useState } from 'react'
import { UseCart, UseDispatchCart } from './contextReducer';

export default function Card(props) {
    let dispatch = UseDispatchCart();
    let options = props.options;
    const priceRef = useRef();
    let data = UseCart();
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem_id) {
                food = item;
                break;
            }
        }
        console.log(data)
        console.log(food)
        
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem_id, price: finalPrice, qty: qty })
                console.log(data)
                return
            }
            else if (food.size !== size) {
                
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size }
                )
                console.log(data)
                return;
            }
            return;
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size }
        )
        console.log(data)

    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
        //   setQty(priceRef.current.value)
    }, [])

    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>

                <img style={{ height: "120px", objectFit: "fill" }} src={props.foodItem.img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">{props.desc}</p>
                    <div classwidthName="container w-100">
                        <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1} ref={priceRef} > {i + 1} </option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>


                    </div>
                    <hr></hr>
                    <button className='btn btn-success justify-center ms-2' onClick={handleCart}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}
