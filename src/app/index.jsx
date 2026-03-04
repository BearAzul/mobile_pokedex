import { ActivityIndicator, Text, View, TextInput, FlatList, StatusBar, TouchableOpacity } from "react-native";
import { usePokemonStore } from "@/store/usePokemonStore.js"
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons"
import PokeCard from "@/components/PokeCard.jsx";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const { pokemonList, isLoading, getAllPokemon, searchPokemon, isFetchNextPage } = usePokemonStore()

  const handleSearch = () => {
    searchQuery.trim() === "" ? getAllPokemon() : searchPokemon(searchQuery);
  };

  const loadMore = () => {
    if (!isFetchNextPage && searchQuery.trim() === "") {
      getAllPokemon(true);
    }
  };

  useEffect(() => {
    getAllPokemon()
  }, [])

  if (isLoading) return <ActivityIndicator size="large" className="justify-center flex-1" />

  return (
    <View className="flex-1 px-4 pt-8 pb-6 bg-gray-200">
      <StatusBar barStyle="light-content" />
      <Text className="mx-2 text-2xl font-poppins-semibold">Pokédex</Text>
      <Text className="mx-2 text-sm font-poppins-reg">Explore your world of Pokémon and tracks every species, stat, and ability in the palm of your hand.</Text>

      <View className="flex-row items-center px-4 py-1 mx-2 mt-3 bg-gray-200 border shadow-md rounded-xl border-slate-800">
        <Ionicons name="search" size={20} className="mr-2" />
        <TextInput
          placeholder="Search pokemon..."
          className="flex-1 bg-transparent text-slate-900 font-poppins-reg"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />

        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => { setSearchQuery(""); getAllPokemon(); }}>
            <Ionicons name="close-circle" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      <View className="mt-4">
        {isLoading ? (
          <ActivityIndicator size="large" className="mt-20" />
        ) : (
          <FlatList
            data={pokemonList}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => <PokeCard pokemon={item} />}
            numColumns={2}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <View className="items-center justify-center mt-20">
                <Text className="text-gray-400 font-p-reg">Pokémon not found.</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}

