import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Grid, Table,
} from "@icedesign/base";
// import './components/checkDetail.scss';

const {Row, Col} = Grid;
import { Title } from 'components';
import { PROCESS_VIEW } from '../../constants/ProcessViewConstant';

class ProcessFields extends Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // this.props.actions.checkEssential('2')
    }

    render() {
        const {data=[], visible, changeView} = this.props;
        return (
            <IceContainer className="pch-container" style={{display: visible ? '' : 'none'}}>
                <Title title="查看必要字段详情" />
                <div className="">
                    <Row className="row">
                        <Col span={6}>
                            业务类型:贷款业务类型
                        </Col>
                        <Col span={6}>
                            资方:中国银行
                        </Col>
                        <Col span={6}>
                            产品类型:新车贷
                        </Col>
                        <Col span={6}>
                            产品名称:豪华车1
                        </Col>
                    </Row>
                    <Table dataSource={data} className="table-list">
                        <Table.Column title="序号" dataIndex="orderId" width={120} />
                        <Table.Column title="名称" dataIndex="fieldValue" />
                    </Table>
                    <Button type="primary" className="return-btn" onClick={changeView.bind(this, PROCESS_VIEW.EDITFORM)}>
                        返回
                    </Button>
                </div>
            </IceContainer>
            );
    }
}


export default ProcessFields;
