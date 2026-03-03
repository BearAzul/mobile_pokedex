import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePokemonStore } from '@/store/usePokemonStore.js';

const PokeEvolution = ({ pokemon, color }) => {
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getEvolutionChain } = usePokemonStore();

  const getEvolution = async () => {
    const data = await getEvolutionChain(pokemon.species.url);
    setEvolutions(data);
    setLoading(false);
  };
  
  useEffect(() => {
    getEvolution();
  }, []);

  if (loading) return <ActivityIndicator color={color} className="mt-10" />;

  return (
    <View>
      <View className="items-center">
        {evolutions.map((item, index) => (
          <View key={item.id}>
            <View className="flex-row items-center justify-between w-full p-4 mb-2 bg-gray-100 shadow-md rounded-3xl">
              <View>
                <Text className="text-gray-400 font-poppins-semibold">#{item.id.padStart(3, '0')}</Text>
                <Text className="text-xl text-gray-800 capitalize font-poppins-bold">{item.name}</Text>
              </View>
              <Image
                source={{ uri: item.image }}
                className="w-24 h-24"
                style={{ resizeMode: 'contain' }}
              />
            </View>

            {index < evolutions.length - 1 && (
              <View className="my-2">
                <Ionicons name="arrow-down" size={24} color={color} />
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default PokeEvolution;