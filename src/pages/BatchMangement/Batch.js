import React from 'react';
import MenuButton from '../../CommonComponent/MenuButton/MenuButton';
import Background from '../../component/Background';

const Batch = ({ navigation }) => {

    const buttonArr = [
        {
          title: 'Add Batch',
          link: 'AddBatch',
          style: 'blue'
        },
        {
          title: 'Batch Details',
          link: 'DisplayBatch',
          style: 'green'
        },
        {
          title: 'Manage Student',
          link: '/manage-student',
          style: 'black'
        }
      ];
      
    return (
        <>
        <Background>
           <MenuButton buttonArr={buttonArr} navigation={navigation}/>
        </Background>
        </>);
};

export default Batch;
