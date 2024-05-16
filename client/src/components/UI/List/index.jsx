import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import styles from './styles.module.scss';
import './styles.scss';
import parse from 'html-react-parser'
import AuthorImg from '../../../assets/images/user/avatar_default.jpg';

function ListMASQ(props) {
  let { 
    data, 
    itemLayout = 'vertical', 
    size = 'large', 
    pageSize = 1,
    renderActions,
    renderExtra, 
    avatarProp,
    titleProp,
    descriptionProp
  } = props
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <List
      itemLayout={itemLayout}
      size={size}
      pagination={{
        pageSize: pageSize,
      }}
      dataSource={data || []}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={renderActions ? renderActions() : [
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={renderExtra ? renderExtra(item) : (
            <img
              width={272}
              alt="thumbnail"
              src={item.thumbnail || AuthorImg}
            />
          )}
        >
          <List.Item.Meta
            // avatar={<Avatar src={item.author.avatar} />}
            // title={<a href={item.href}>{item.title}</a>}
            // description={item.description}
            avatar={<Avatar src={avatarProp ? avatarProp(item) : AuthorImg} />}
            title={<a href={titleProp ? titleProp(item) : item?.href}>{titleProp ? titleProp(item) : "title đang cập nhật"}</a>} // Dynamic title
            description={descriptionProp ? descriptionProp(item) : "description đang cập nhật"}
          />
          <span className={styles.limitedHeight}>
            {parse(item?.content) || 'content đang cập nhật'}
          </span>
        </List.Item>
      )}
    />
  )
}

export default ListMASQ;
