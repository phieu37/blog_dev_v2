import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import styles from './styles.module.scss';
import './styles.scss';
import parse from 'html-react-parser';
import AuthorImg from '../../../assets/images/user/avatar_default.jpg';
import { Link } from 'react-router-dom';

function ListMASQ(props) {
  const {
    data,
    itemLayout = 'vertical',
    size = 'large',
    pageSize = 1,
    actions,
    extra,
    thumbnail,
    avatar,
    title,
    description,
    onClick,
    content,
    getItemUrl
  } = props;

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

      renderItem={(item) => {
        const itemUrl = getItemUrl ? getItemUrl(item) : null;

        const listItem = (
          <List.Item
            key={item._id}
            actions={actions ? actions(item) : [
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={extra ? extra(item) : (
              <img
                width={272}
                alt="thumbnail"
                src={thumbnail ? thumbnail(item) : AuthorImg}
              />
            )}
            onClick={() => onClick(item)}
          >
            <List.Item.Meta
              avatar={<Avatar src={avatar ? avatar(item) : AuthorImg} />}
              title={title ? title(item) : 'title đang cập nhật'}
              description={description ? description(item) : 'description đang cập nhật'}
            />
            <div className={styles.limitedHeight}>
              {parse(content ? content(item) : "content")}
            </div>
          </List.Item>
        );

        return itemUrl ? <Link to={itemUrl}>{listItem}</Link> : listItem;
      }}
    />
  );
}

export default ListMASQ;
