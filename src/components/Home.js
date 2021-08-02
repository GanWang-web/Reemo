import { useState,useEffect } from 'react';
import { Layout, Menu,Image,Button,Row, Col,Typography,Divider,Upload,message  } from 'antd';
import { LaptopOutlined, NotificationOutlined,DownloadOutlined,DeleteOutlined,FileImageOutlined,UploadOutlined  } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getPhotoName,putPhoto,deleteAPI } from '../api/photoApi';
import ImgCrop from 'antd-img-crop';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default function Home({currentUser}) {
  const {Text} = Typography
  const [photo,setPhoto] = useState({});
  const [fileList, setFileList] = useState([]);
  const photos = useSelector(({photos})=>photos)
  const [photoName,setPhotoName] = useState([])

  useEffect(()=>{
    const params = {
      "Id":currentUser.username,
    }
    fetchPhotoNames(params)
  },[])

  const fetchPhotoNames = async (params)=>{
    const res = await getPhotoName(params)
    setPhotoName(res)
    console.log(res);
    // dispatch({type:"setPhotoURL",payload:res.photos})
  }
  
  const handleUploadPhotos=(e)=>{
    if(JSON.stringify(fileList)==="[]"){
      alert("photo can not be empty!!")
      return
    }

    const photosInfo={};
    for(let i of fileList){
      let URL;
      const {name} = i;
      const newName = name.substr(0,name.lastIndexOf("."))
      if(i.src){
        URL = i.src
      } else if(i.thumbUrl){
        URL = i.thumbUrl
      } else if(i.url){
        URL = i.url
      }
      photosInfo[newName] = {
        "URL":URL,
        "time":Date.now()
      }
    }
    const photoArr = {
      "Id":currentUser.username,
      "Key":currentUser.username,
      "photos":photosInfo
    };
    if(JSON.stringify(photoName)!=="[]"){
      photoArr["appendPhoto"]=true;
    }
    const res=putPhoto(photoArr)
    console.log(photoArr);
    res.then(response=>{
      console.log(response);
      if(JSON.stringify(response)==="{}"){
        message.info("Upload successfully!")
        // setFileList([])
        // const setPayload={}
        // setPayload[item] = {URL:res}
        // dispatch({type:"setPhotoURL",payload:setPayload})
      }
    })
  }
  const toDelete=(name)=>{
    console.log({name});
    const res = deleteAPI({name})
    console.log(res);
    // res.then(response=>console.log(res)).catch(err=>console.log(err))
  }
  async function getPhoto(item){
    const params = {
      "Id":currentUser.username,
      "photoName":item
    }
    const res = await getPhotoName(params)
    // const setPayload={}
    // setPayload[item] = {URL:res}
    setPhotoName(res)
    // dispatch({type:"setPhotoURL",payload:res.photos})
  }



  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (
    <Layout>
        <Sider width={250} className="site-layout-background">
          <Menu
            selectable={false}
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            theme="dark"
          >
            <SubMenu key="sub1" icon={<FileImageOutlined />} title="Images">
            {
              (photoName.photos)?(
                Object.keys(photoName.photos).map((item,i)=>{
                  return (
                  <Menu.Item key={i}>
                    <Button 
                    type="primary" 
                    onClick={()=>{getPhoto(item)}} 
                    shape="circle" 
                    icon={<DownloadOutlined />} 
                    size="default" />
                    &nbsp;&nbsp;{item}
                  </Menu.Item>
                )})
              ):null
            }
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Notes">
              <Menu.Item key="sub9">
                Under development
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Vedios">
              <Menu.Item key="sub10">
                Under development
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
          <Divider orientation="center">Images</Divider>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {
              (photoName.photos)?(
                Object.keys(photoName.photos).map((k,i)=>{
                  return (
                    <Col className="gutter-row" span={7} key={i}>
                      <div style={{
                        padding: '8px 0',
                        textAlign:"center"
                      }}>
                        <Image
                        preview={true}
                        src={photoName.photos[k].URL}
                      />
                        <Text>{k}</Text><div>
                        <Button 
                    type="default" 
                    onClick={toDelete(k)}

                    icon={<DeleteOutlined />} 
                    size="small" /></div>
                      </div>
                    </Col>
                  )
                })
              ):null
            }
            </Row>
            <Divider orientation="center"></Divider>
            <ImgCrop rotate>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              // onPreview={onPreview}
              accept="image/gif,image/jpeg,image/jpg,image/png"
            >
              {fileList.length < 4 && '+ Upload'}
            </Upload>
          </ImgCrop>
          <Button 
            icon={<UploadOutlined/>} onClick={handleUploadPhotos}
          />
          </Content>
        </Layout>
    </Layout>
  )
}
