import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, useRouter } from "expo-router"
import { usePokemonStore } from '@/store/usePokemonStore.js'
import { PokemonColors } from '@/constants/PokemonColors.js'
import { Ionicons } from "@expo/vector-icons"
import { useState, useEffect } from "react"
import PokeAbout from "@/components/PokeAbout.jsx"
import PokeBaseStats from "@/components/PokeBaseStats.jsx"
import PokeMoves from "@/components/PokeMoves.jsx"
import PokeEvolution from "@/components/PokeEvolution.jsx"


const details = () => {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { pokemonList, searchPokemon, isLoading } = usePokemonStore()

  const pokemon = pokemonList.find(poke => poke.id.toString() === id);

  const [activeTab, setActiveTab] = useState('About');
  const [localPokemon, setLocalPokemon] = useState(null);

  const Tabs = ["About", "Stats", "Moves", "Evolution"]

  useEffect(() => {
    const found = pokemonList.find(poke => poke.id.toString() === id);

    if (found) {
      setLocalPokemon(found);
    } else {
      const fetchData = async () => {
        const result = await searchPokemon(id);
        if (result) setLocalPokemon(result);
      };
      fetchData();
    }
  }, [id, pokemonList])

  if (!localPokemon || isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#48CFB2" />
      </View>
    );
  }

  const mainType = localPokemon.types[0].type.name;
  const backgroundColor = PokemonColors[mainType] || "#A8A878";

  return (
    <View className="flex-1 pt-8" style={{ backgroundColor }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="z-20 flex-row items-center justify-between px-6 mt-4">
        <TouchableOpacity onPress={() => router.back()}>
          <View className='p-2 rounded-full bg-white/30 backdrop-blur-md'>
            <Ionicons name="arrow-back" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <Text className="text-xl text-white font-poppins-bold">#{pokemon.id.toString().padStart(3, '0')}</Text>
      </SafeAreaView>

      <View className="px-6 pt-2 pb-32 mt-6 mb-10">
        <Text className="text-4xl text-white capitalize font-poppins-bold">{pokemon.name}</Text>

        <View className="flex-row mt-2">
          {pokemon?.types?.map((t, index) => (
            <View key={index} className="px-3 py-1 mr-2 rounded-full bg-white/30">
              <Text className="text-white capitalize font-poppins-reg">{t.type.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className='flex-1 bg-white rounded-t-[40px] px-6 pt-20'>
        <View className='absolute left-0 right-0 items-center -top-40'>
          <Image source={{ uri: pokemon.sprites.other['official-artwork'].front_default }} className='w-64 h-64' style={{ resizeMode: 'contain' }} />
        </View>

        <View className="flex-row justify-between mt-6 mb-6 border-b border-gray-100">
          {Tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="items-center flex-1 pb-3"
              style={{ borderBottomWidth: 2, borderBottomColor: activeTab === tab ? backgroundColor : 'transparent' }}
            >
              <Text className="font-poppins-semibold"
                style={{
                  color: activeTab === tab ? backgroundColor : "#BBBBBB"
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
          {activeTab === 'About' && (
            <PokeAbout pokemon={pokemon} />
          )}

          {activeTab === 'Stats' && (
            <PokeBaseStats pokemon={pokemon} color={backgroundColor} />
          )}

          {activeTab === 'Moves' && (
            <PokeMoves pokemon={pokemon} color={backgroundColor} />
          )}

          {activeTab === "Evolution" && (
            <PokeEvolution pokemon={pokemon} color={backgroundColor} />
          )}
        </ScrollView>
      </View>
    </View>
  )
}

export default details