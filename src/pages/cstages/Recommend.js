import CstagePatient from "./CstagePatient";
import TimeAgo from "./TimeAgo";

import {  useParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import { useGetCstagesQuery } from "./cstagesSlice";

import { getThai } from "../../utility/getThai";
import { getRecommend } from "../../utility/getRecommend";
import { useEffect } from "react";
import { Button, Col } from "reactstrap";

const Recommend = () => {
    const navigate=useNavigate()
    useEffect(() => {
        console.log('Recommend mounted');
      }, []);
    const { cstageId } = useParams()
    console.log('cstageId:', cstageId);
    const { cstage, isLoading } = useGetCstagesQuery('getCstages', {
        selectFromResult: ({ data, isLoading }) => ({
            cstage: data?.entities[cstageId],
            isLoading
        }),
    })

    if (isLoading) return <p>Loading...</p>

    if (!cstage) {
        return (
            <section>
                <h2>Cstage not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <Col>
            <h5><strong style={{color:'#FF0000'}}>Clinical staging :{cstage.stage}</strong>{' '}{cstage.cT}{cstage.ctsize&& `(${cstage.ctsize} mm )`}{' '}{cstage.cN}{' '}{cstage.M}</h5>
            <p>วันที่พบแพทย์ครั้งแรก:{getThai(cstage.datefirstvst)}</p>
            <p>วันที่เก็บชิ้นเนื้อ :{getThai(cstage.datecdx)}</p>
            <p>วันที่แพทย์แจ้งผล:{getThai(cstage.datedoctorrpt)}</p>
            <p>ผลพยาธิวิทยา : {cstage.htype}</p>
            <p>Grade : {cstage.grade}</p>
            <p>{cstage.birads}</p>
            <p>{cstage.side==='Lt'?'ข้างซ้าย':cstage.side==='Rt'?'ข้างขวา':''}</p>
            <p className="postCredit">
                <Button className="btn-custom"  onClick={() => navigate(`/cstage/edit/${cstageId}`)}>แก้ไข</Button>
             {' '}   <CstagePatient patientId={cstage.patientId} />
                <TimeAgo timestamp={cstage.date} />
            </p></Col>
            <Col>
           <p>{getRecommend ('Triple Negative','2',45,'cT2','cN0',35,)}</p> 
            </Col>
           
        </article>
    )
}

export default Recommend