/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ChatStore from '../Stores/ChatStore';
import './DialogTitleControl.css';

class DialogTitleControl extends React.Component {
    constructor(props){
        super(props);

        this.onUpdate = this.onUpdate.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.chatId !== this.props.chatId){
            return true;
        }

        return false;
    }

    componentDidMount(){
        ChatStore.on('updateChatTitle', this.onUpdate);
    }

    componentWillUnmount(){
        ChatStore.removeListener('updateChatTitle', this.onUpdate);
    }

    onUpdate(update){
        if (!update.chat_id) return;
        if (update.chat_id !== this.props.chatId) return;

        this.forceUpdate();
    }

    render() {
        const chat = ChatStore.get(this.props.chatId);
        if (!chat) return null;

        const title = chat.title || 'Deleted account';

        return (<div className='dialog-title'>{title}</div>);
    }
}

export default DialogTitleControl;