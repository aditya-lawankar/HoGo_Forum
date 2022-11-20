import React, { useEffect } from 'react';
import { useState } from 'react';
// import NavBar from './components/navbar/navbar';
// import './Homeowner.css';
import { Button, Col, Container, Stack, Alert, Card } from 'react-bootstrap';
// import axios from 'axios';
import firebase from 'firebase/compat/app';
import AuthGoogle from './AuthGoogle';
import { io } from 'socket.io-client';

const firebaseConfig = {
  apiKey: 'AIzaSyApGu9ocnsTuj8lPsmB7hsD0KVAz8E0OY8',
  authDomain: 'seproj-b3304.firebaseapp.com',
  projectId: 'seproj-b3304',
  storageBucket: 'seproj-b3304.appspot.com',
  messagingSenderId: '42172049653',
  appId: '1:42172049653:web:cddc7902753e3ba3343dbc',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function Homeowner() {
  const [vals, setVals] = useState({
    name: '',
    phno: '',
    apno: '',
  });
  const [val, setVal] = useState({
    name: '',
    phno: '',
    apno: '',
  });

  // const handleSearch = async () => {
  //   axios.get(`http://127.0.0.1:4000/search/44a`).then((response) => {
  //     val.phno = response.data[0].phno;
  //     console.log(val.phno);
  //   });
  // };

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('http://localhost:5001'));
    console.log(socket);
  }, []);

  useEffect(() => {
    socket?.emit('newUser', val.apno);
  }, [socket, val]);

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    socket?.on('entryalert', (data) => {
      setEntries((prev) => [...prev, data]);
      <Card>{entries.map((n) => displayEntries(n))};</Card>;
    });
  }, [socket]);

  const displayEntries = ({ sendername, senderagency, senderpurpose }) => {
    return (
      <Container>
        <span className="mainline">{`Hey ${val.name} ${sendername} from ${senderagency} wants permission for ${senderpurpose}`}</span>
        <Button
          variant="success"
          onClick={() => {
            handleDecisison('accept', sendername);
          }}
        >
          Accept
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleDecisison('deny', sendername);
          }}
        >
          Deny
        </Button>
      </Container>
    );
  };

  const handleDecisison = (props) => {
    socket?.emit('aord', {
      answer: props.answer,
      apartno: val.apno,
      reciever: props.sendername,
    });
  };

  const inputEvent = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setVals((preValue) => {
      if (name === 'apno') {
        return {
          apno: value,
          name: preValue.name,
        };
      } else {
        return {
          apno: preValue.apno,
          name: value,
        };
      }
    });
    // console.log(name,value);
  };
  console.log(entries);
  return (
    <Container fluid className="container">
      {val.apno ? (
        <Container className="entrance">
          {/* <NavBar /> */}
          <AuthGoogle auth={firebase.auth()} />

          {/* <Container className="notis">
            <Card>{entries.map((n) => displayEntries(n))};</Card>
            setEntries([]);
          </Container> */}
        </Container>
      ) : (
        <Container className="entrance">
          {/* <NavBar /> */}
          <Col>
            <Stack gap={3}>
              <input
                type="text"
                name="apno"
                placeholder="Please enter your apartment no"
                onChange={inputEvent}
                value={vals.apno}
                autoComplete="Off"
              />
              <input
                type="text"
                name="name"
                placeholder="Please enter your name"
                onChange={inputEvent}
                value={vals.name}
                autoComplete="Off"
              />
            </Stack>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                setVal(vals);
                // handleSearch();
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
export default Homeowner;
