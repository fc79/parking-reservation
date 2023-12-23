import { Container, Row, Col } from 'react-bootstrap';
import styles from './SupportChatStyles.module.css';
import InputEmoji from 'react-input-emoji';
import { Avatar, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

const SupportChat = () => {
  return (
    <Container fluid>
      <Row style={{ height: '100vh' }}>
        <Col className={styles.MembersContainer}>
          <div style={{ borderBottom: '2px solid gray' }} className="p-1">
            <h2>مکالمه ها</h2>
          </div>
          <div className={styles.membersList}>
            <div>hello</div>
            <div>hello</div>
          </div>
        </Col>
        <Col xs={8} sm={9} className={styles.chatfeed}>
          <div className={styles.inputFieldContainer}>
            <InputEmoji fontFamily="iransans" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SupportChat;
