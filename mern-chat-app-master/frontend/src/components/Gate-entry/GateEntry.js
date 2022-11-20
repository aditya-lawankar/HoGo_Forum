import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Col, Stack, Button } from 'react-bootstrap';
// import './Gateentry.css';
// import NavBar from './components/navbar/navbar';
import Card from './Card';
import { io } from 'socket.io-client';

function Gateentry() {
  const [vals, setVals] = useState({
    ename: '',
    agency: '',
    purpose: '',
    houseno: '',
  });
  const [val, setVal] = useState({
    ename: '',
    agency: '',
    purpose: '',
    houseno: '',
  });

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io('http://localhost:5001'));
    console.log(socket);
  }, []);

  useEffect(() => {
    socket?.emit('newUser', val.ename);
  }, [socket, val]);

  const onSubmits = (e) => {
    socket?.emit('sendtohome', {
      sendername: val.ename,
      senderagency: val.agency,
      senderpurpose: val.purpose,
      senderhno: val.houseno,
    });
  };

  const [response, setResponse] = useState([]);

  useEffect(() => {
    socket?.on('aord', (data) => {
      setResponse((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayAord = ({ answer, apartno }) => {
    if (answer === 'accept') {
      return (
        <span>
          `Hey ${val.ename} you have been granted permission to enter by owner
          of flatno:${apartno}`
        </span>
      );
    } else {
      return (
        <span> `Hey the owner of flatno:${apartno} has denied your entry`</span>
      );
    }
  };

  const inputEvent = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setVals((preValue) => {
      if (name === 'ename') {
        return {
          ename: value,
          agency: preValue.agency,
          purpose: preValue.purpose,
          houseno: preValue.houseno,
        };
      } else if (name === 'agency') {
        return {
          ename: preValue.ename,
          agency: value,
          purpose: preValue.purpose,
          houseno: preValue.houseno,
        };
      } else if (name === 'purpose') {
        return {
          ename: preValue.ename,
          agency: preValue.agency,
          purpose: value,
          houseno: preValue.houseno,
        };
      } else {
        return {
          ename: preValue.ename,
          agency: preValue.agency,
          purpose: preValue.purpose,
          houseno: value,
        };
      }
    });
  };

  return (
    <Container fluid className="container">
      {val.ename ? (
        <Container>
          {/* <NavBar /> */}
          <Card dataFromParent={val.ename} />
          <Container className="response">
            <Card>{response.map((n) => displayAord(n))}; setResponse([]);</Card>
          </Container>
        </Container>
      ) : (
        <Container fluid className="entrance" sm={{ span: 10, offset: 1 }}>
          <Col>
            {/* <NavBar /> */}
            <Stack gap={3}>
              <input
                type="text"
                name="ename"
                placeholder="Enter Your Name"
                onChange={inputEvent}
                value={vals.ename}
                autoComplete="off"
              />
              <input
                type="text"
                name="agency"
                placeholder="Enter Your Agency"
                onChange={inputEvent}
                value={vals.agency}
                autoComplete="off"
              />
              <input
                type="text"
                name="purpose"
                placeholder="Enter Your Purpose"
                onChange={inputEvent}
                value={vals.purpose}
                autoComplete="off"
              />
              <input
                type="text"
                name="houseno"
                placeholder="Enter Your Houseno"
                onChange={inputEvent}
                value={vals.houseno}
                autoComplete="off"
              />
            </Stack>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                setVal(vals);
                onSubmits();
              }}
            >
              Submit
            </Button>
          </Col>
        </Container>
      )}
    </Container>
  );
}
export default Gateentry;
