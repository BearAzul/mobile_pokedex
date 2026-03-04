import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { usePokemonStore } from '@/store/usePokemonStore.js';
import { useRouter } from "expo-router"

const PokeEvolution = ({ pokemon, color }) => {
  const router = useRouter()
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getEvolutionChain } = usePokemonStore();

  useEffect(() => {
    const getEvolution = async () => {
      const data = await getEvolutionChain(pokemon.species.url);
      setEvolutions(data);
      setLoading(false);
    };
    getEvolution();
  }, [pokemon.id]);

  if (loading) return <ActivityIndicator color={color} className="mt-10" />;

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="px-4">
      <Text className="mb-4 text-center text-gray-500 font-poppins-semibold">
        Evolution Chain
      </Text>
      <View className="flex-row flex-wrap justify-between">
        {evolutions.map((item, index) => (
          <TouchableOpacity key={`${item.id}-${index}`} className="w-[48%] mb-4"
            onPress={() => router.push({ pathname: "/details", params: { id: item.id.toString() } })}
          >
            <View
              className={`p-3 items-center rounded-3xl bg-gray-100 shadow-sm`}

              style={ item.name === pokemon.name ? {borderColor: color, borderWidth: 2}: {borderColor: "none"}}
            >
              <Text className="text-xs text-gray-400 font-poppins-semibold">
                #{item.id.padStart(3, '0')}
              </Text>
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 my-1"
                style={{ resizeMode: 'contain' }}
              />
              <Text className="text-sm text-center text-gray-800 capitalize font-poppins-bold">
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default PokeEvolution;

