import { useState, createContext, useContext } from "react";

const EditContext = createContext(
    {
        isCreating:false,
        id:'',
        config:{},
        initData:null,
        articleHTML:'',
        category:[],
        tag:[],
        read: false
    }
);

const EditProvider = (props) => {
    const [isCreating, setIsCreating] = useState(false);
    const [id, setId] = useState(''); //article id
    const [read, setRead] = useState(false)
    const [deleted, setDeleted] = useState(true)


    // current no use states
    const [config, setConfig] = useState({}); // ReactEditorJS config
    const [initData, setInitData] = useState(null); // default data
    const [articleHTML, setArticleHTML] = useState('');
    const [category, setCategory] = useState([]);
    const [tag, setTag] = useState([]);


    return (
        <EditContext.Provider
            value={{
                isCreating, id, config, initData, articleHTML, category, tag, setIsCreating, setId, read, setRead, deleted, setDeleted
            }}
            {...props}
        />
    );
}

const useEdit = () => useContext(EditContext);

export {EditProvider, useEdit}