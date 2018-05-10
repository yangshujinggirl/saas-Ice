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
        const {formData = {}, data=[], visible, changeView} = this.props;
        return (
            <IceContainer className="pch-container" style={{display: visible ? '' : 'none'}}>
                <Title title="查看必要字段详情" />
                <div className="">
                    <Row className="row">
                        <Col span={6}>
                            业务类型:{formData.businessTypeName}
                        </Col>
                        <Col span={6}>
                            资方:{formData.tenantName}
                        </Col>
                        <Col span={6}>
                            流程名称:{formData.processName}
                        </Col>
                    </Row>
                    <Table dataSource={data} className="table-list">
                        <Table.Column title="序号" dataIndex="orderId" width={120} />
                        <Table.Column title="名称" dataIndex="fieldValue" />
                    </Table>
                    <Button type="primary" className="return-btn" onClick={changeView.bind(this)}>
                        返回
                    </Button>
                </div>
            </IceContainer>
            );
    }
}


export default ProcessFields;
