import React from "react";
import { List, Avatar } from "antd";



const Jobs = props => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3
            }}
            dataSource={props.data}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={`/articles/${item.id}`}> {item.title} </a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />
    );
};

export default Jobs;