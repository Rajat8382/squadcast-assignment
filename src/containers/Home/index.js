import { useState } from 'react';
import peopleData from '../../mocks/data.json';
import CustomInput from '../../components/Input';
import './styles.css';

const Home = () => {
	const [input, setInput] = useState('');
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [numberOfMentions, setNumberOfMentions] = useState(0);

	const getSuggestions = (e) => {
    const text = e.target.value;
    setInput(text);
    const mentionCountInInput = text.split('@').length - 1;
		if (text.includes('@') && mentionCountInInput > numberOfMentions) {
			setShowSuggestions(true);
      // This is to get only terms after @ and before space.
      const atIndex = text.lastIndexOf('@');
      const spaceIndex = text.indexOf(' ', atIndex);
      const searchTerm = spaceIndex === -1 ? text.slice(atIndex + 1) : text.slice(atIndex + 1, spaceIndex);
     
      // returns the filtered list by matching the typed term after @ and before space from the list of users
			const filteredUsers = peopleData.filter((user) => {
				let name = `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`;
				return name.includes(searchTerm.toLowerCase());
			});
				setSuggestedUsers(filteredUsers);
			} else {
      setShowSuggestions(false)
    }
	};

  const handleSelect = (value) => {
    const {first_name , last_name} = value;
    let selected = `${first_name} ${last_name}`
    const lastIndex = input.lastIndexOf('@');
    const newValue = input.slice(0, lastIndex + 1) + selected + ' ';
    setInput(newValue);
    setNumberOfMentions(prev => prev + 1)
    setShowSuggestions(false);
  }

	return (
		<div className='home'>
			<div className='container'>
        <CustomInput
          type="text"
          value={input}
          onChange={getSuggestions}
        />
				{(showSuggestions && suggestedUsers?.length !== 0) && (
					<ul className='suggestions'>
						{suggestedUsers.map((item) => {
							return (
								<li key={item.id} onClick={()=>handleSelect(item)}>
									{item.first_name} {item.last_name}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Home;
