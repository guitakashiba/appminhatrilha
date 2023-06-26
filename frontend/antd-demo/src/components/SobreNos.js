//SobreNos.js
import React from 'react';
import { Card, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';

const { Meta } = Card;

const teamMembers = [
  {img: "frontend/antd-demo/public/1.png", desc: "Descrição 1"},
  {img: "../public/leozin.jpeg", desc: "Descrição 2"},
  {img: "../public/mathias.jpeg", desc: "Descrição 3"}
]

const supporters = [
  {img: "link/to/image1", desc: "Descrição 1"},
  {img: "link/to/image2", desc: "Descrição 2"},
  {img: "link/to/image3", desc: "Descrição 3"}
]

const projectOrigin = "Texto sobre a origem do projeto";

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  function SobreNos() {
    return (
      <div className="site-card-wrapper">
        <Card>
          <Carousel autoplay>
              {teamMembers.map((member, i) => (
                  <div key={i}>
                      <h3 style={contentStyle}>
                        <img src={member.img} alt={`team member ${i + 1}`} />
                        <p>{member.desc}</p>
                      </h3>
                  </div>
              ))}
          </Carousel>
        </Card>
      </div>
    );
  }

export default SobreNos;
