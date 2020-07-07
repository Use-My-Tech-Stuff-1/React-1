import React, {useState, useEffect} from 'react';

import { Card, CardTitle, Container, CardImg, Row, Col, CardText } from 'reactstrap';
import { Link } from 'react-router-dom'
import './App.css';


const TechList = (props) => {

    return (
        //The link to make a posting needs to make sure that the user is logged in first.
        <div>
            <Container>
            <Row>
            {
                props.products.map( product => {
                    return(
                    <Col sm='4'>
                        <Card className='Card' style={{marginTop: "15%"}} key={product.prod_id}>
                           

                           
                        <Link className = 'Link' to = {`/product/${product.prod_id}`}>
                        <CardTitle style={{color:"green", textDecoration:"underline"}}>{product.name}</CardTitle>
                        <CardImg style={{minHeight: "150px", maxWidth:"120px", align: "center"}} src={product.image_URL} />
                        </Link>
                        <CardText style={{color:"green"}}>
                        Price: {product.price}
                        </CardText>
                    
                        </Card>
                    </Col>
                    )
                })
            }
            </Row>
            </Container>
        </div>
    );
};
export default TechList;